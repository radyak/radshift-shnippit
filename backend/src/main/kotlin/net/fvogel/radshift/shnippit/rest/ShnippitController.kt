package net.fvogel.radshift.shnippit.rest

import net.fvogel.radshift.shnippit.PublicIdService
import net.fvogel.radshift.shnippit.model.Shnippit
import net.fvogel.radshift.shnippit.persistence.ShnippitRepository
import net.fvogel.radshift.shnippit.rest.exceptions.NotFoundException
import org.springframework.web.bind.annotation.*
import javax.transaction.Transactional

@Transactional
@RestController
@RequestMapping("/api/v1/shnippits")
class ShnippitController(val shnippitRepository: ShnippitRepository,
                         val publicIdService: PublicIdService
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

}