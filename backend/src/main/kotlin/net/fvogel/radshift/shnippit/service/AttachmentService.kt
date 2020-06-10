package net.fvogel.radshift.shnippit.service

import net.fvogel.radshift.shnippit.model.Attachment
import org.springframework.core.io.Resource
import org.springframework.web.multipart.MultipartFile


interface AttachmentService {
    fun storeAttachments(attachmentFiles: Array<MultipartFile>?, subPath: String)
    fun listAttachments(subPath: String): List<Attachment>
    fun loadAttachmentAsResource(subPath: String, attachmentFileName: String): Resource?
    fun deleteAttachment(subPath: String, attachmentFileName: String)
}