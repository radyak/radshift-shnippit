package net.fvogel.radshift.shnippit.rest

import net.fvogel.radshift.shnippit.model.Attachment
import net.fvogel.radshift.shnippit.model.Shnippit
import net.fvogel.radshift.shnippit.persistence.ShnippitRepository
import net.fvogel.radshift.shnippit.rest.exceptions.NotFoundException
import net.fvogel.radshift.shnippit.service.PublicIdService
import net.fvogel.radshift.shnippit.service.AttachmentService
import org.springframework.core.io.Resource
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import javax.transaction.Transactional


@Transactional
@RestController
@RequestMapping("/api/v1/shnippits")
class ShnippitController(val shnippitRepository: ShnippitRepository,
                         val publicIdService: PublicIdService,
                         val attachmentService: AttachmentService
) {

    @GetMapping
    fun getAllShnippits(): List<Shnippit> {
        return shnippitRepository.findAll();
    }

    @PostMapping
    fun createShnippit(@RequestBody shnippit: Shnippit): Shnippit {
        val shnippit = Shnippit(publicId = publicIdService.createPublicId(), text = shnippit.text);
        return shnippitRepository.save(shnippit);
    }

    @GetMapping("{publicId}")
    fun getByPublicId(@PathVariable publicId: String): Shnippit {
        val shnippit = shnippitRepository.findByPublicId(publicId) ?: throw NotFoundException();
        return shnippit
    }

    @PutMapping("{publicId}")
    fun updateShnippit(@PathVariable publicId: String, @RequestBody updatedShnippit: Shnippit): Shnippit {
        val shnippit = shnippitRepository.findByPublicId(publicId) ?: throw NotFoundException();
        shnippit.text = updatedShnippit.text;
        shnippit.type = updatedShnippit.type;
        return shnippitRepository.save(shnippit);
    }

    @PostMapping("/{publicId}/attachments")
    fun saveAttachments(@RequestParam("attachments") attachmentFiles: Array<MultipartFile>, @PathVariable publicId: String) {
        attachmentService.storeAttachments(attachmentFiles, publicId)
    }

    @GetMapping("/{publicId}/attachments")
    fun listAttachments(@PathVariable publicId: String): List<Attachment> {
        return attachmentService.listAttachments(publicId)
    }

    @GetMapping("/{publicId}/attachments/{attachmentFileName}")
    fun getAttachmentAsResource(@PathVariable publicId: String, @PathVariable attachmentFileName: String): ResponseEntity<Resource> {
        val resource = attachmentService.loadAttachmentAsResource(publicId, attachmentFileName)
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);

    }

    @DeleteMapping("/{publicId}/attachments/{attachmentFileName}")
    fun deleteAttachments(@PathVariable publicId: String, @PathVariable attachmentFileName: String) {
        return attachmentService.deleteAttachment(publicId, attachmentFileName)
    }

}