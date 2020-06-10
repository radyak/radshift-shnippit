package net.fvogel.radshift.shnippit.service

import net.fvogel.radshift.shnippit.model.Attachment
import net.fvogel.radshift.shnippit.rest.exceptions.NotFoundException
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.InputStreamResource
import org.springframework.core.io.Resource
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.io.FileInputStream
import java.util.stream.Collectors


@Service
class PersistentAttachmentService(): AttachmentService {

    @Value("\${application.attachments.storagePath}")
    private lateinit var storageBasePath: String

    override fun storeAttachments(attachmentFiles: Array<MultipartFile>?, subPath: String) {
        val storagePath = File("$storageBasePath/$subPath")
        storagePath.mkdirs()
        attachmentFiles?.forEach {
            val targetFile = File("${storagePath.absolutePath}/${it?.originalFilename}")
            it?.transferTo(targetFile)
            println("Stored to ${targetFile}")
        }
    }

    override fun listAttachments(subPath: String): List<Attachment> {
        val storagePath = File("$storageBasePath/$subPath")
        if (!storagePath.exists()) {
            throw NotFoundException()
        }
        return storagePath.listFiles().toList().stream()
                .map { file -> Attachment(file.name, file.length()) }
                .collect(Collectors.toList())
    }

    override fun loadAttachmentAsResource(subPath: String, attachmentFileName: String): Resource? {
        val file = File("$storageBasePath/$subPath/$attachmentFileName")
        if (!file.exists()) {
            throw NotFoundException()
        }
        return InputStreamResource(FileInputStream(file))
    }

    override fun deleteAttachment(subPath: String, attachmentFileName: String) {
        val file = File("$storageBasePath/$subPath/$attachmentFileName")
        if (!file.exists()) {
            return
        }
        file.delete()
        println("Deleted ${file.absolutePath}")
    }

}