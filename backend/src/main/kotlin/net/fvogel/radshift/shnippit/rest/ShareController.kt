package net.fvogel.radshift.shnippit.rest

import net.fvogel.radshift.shnippit.model.Shnippit
import net.fvogel.radshift.shnippit.persistence.ShnippitRepository
import net.fvogel.radshift.shnippit.service.AttachmentService
import net.fvogel.radshift.shnippit.service.PublicIdService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.ModelAndView
import java.util.stream.Collectors
import javax.transaction.Transactional


@Transactional
@RestController
@RequestMapping("/share")
class ShareController(val shnippitRepository: ShnippitRepository,
                      val publicIdService: PublicIdService,
                      val attachmentService: AttachmentService) {

    @PostMapping("", consumes = ["multipart/form-data"])
    fun saveAttachments(@RequestPart(required = false) file: MultipartFile,
                        @RequestPart(required = false) title: String?,
                        @RequestPart(required = false) name: String?,
                        @RequestPart(required = false) description: String?,
                        @RequestPart(required = false) text: String?,
                        @RequestPart(required = false) url: String?,
                        @RequestPart(required = false) link: String?): ModelAndView {

        val shnippitText = arrayListOf(title, name, description, text, url, link)
                .stream()
                .filter{ it != null }
                .collect(Collectors.joining("\n"))
        val shnippit = Shnippit(publicId = publicIdService.createPublicId(), text = shnippitText);
        shnippitRepository.save(shnippit);

        attachmentService.storeAttachments(arrayOf(file), shnippit!!.publicId!!)

        return ModelAndView("redirect:/${shnippit.publicId}");
    }

}