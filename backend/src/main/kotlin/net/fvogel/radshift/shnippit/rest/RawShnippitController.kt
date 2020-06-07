package net.fvogel.radshift.shnippit.rest

import net.fvogel.radshift.shnippit.model.Type
import net.fvogel.radshift.shnippit.persistence.ShnippitRepository
import net.fvogel.radshift.shnippit.rest.exceptions.BadRequestException
import net.fvogel.radshift.shnippit.rest.exceptions.NotFoundException
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletResponse
import javax.transaction.Transactional

@Transactional
@RestController
@RequestMapping("/raw")
class RawShnippitController(val shnippitRepository: ShnippitRepository) {

    @GetMapping("{publicId}")
    fun getRawContentByPublicId(@PathVariable publicId: String,
                                response: HttpServletResponse): ResponseEntity<String> {
        val shnippit = shnippitRepository.findByPublicId(publicId) ?: throw NotFoundException();
        return ResponseEntity.ok()
                .contentType(mapShnippitTypeToMediaType(shnippit.type))
                .body(shnippit.text);
    }

    @GetMapping("/{publicId}.{type}")
    fun getRawContentByPublicIdAndType(@PathVariable publicId: String,
                                       @PathVariable type: String,
                                       response: HttpServletResponse): ResponseEntity<String> {
        val shnippit = shnippitRepository.findByPublicId(publicId) ?: throw NotFoundException();
        return ResponseEntity.ok()
                .contentType(mapTypeStringToMediaType(type))
                .body(shnippit.text);
    }

    private fun mapShnippitTypeToMediaType(type: Type): MediaType {
        return when (type) {
            null -> MediaType.TEXT_PLAIN
            Type.RAW -> MediaType.TEXT_PLAIN
            Type.HTML -> MediaType.TEXT_HTML
            Type.JSON -> MediaType.APPLICATION_JSON
            Type.XML -> MediaType.APPLICATION_XML
            Type.MARKDOWN -> MediaType.TEXT_MARKDOWN
        }
    }

    private fun mapTypeStringToMediaType(typeString: String): MediaType {
        try {
            val type: Type = Type.valueOf(typeString.toUpperCase())
            return mapShnippitTypeToMediaType(type)
        }
        catch (e: IllegalArgumentException) {
            throw BadRequestException()
        }
    }

}