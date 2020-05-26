package net.fvogel.radshift.shnippit.persistence

import net.fvogel.radshift.shnippit.model.Shnippit
import org.springframework.data.jpa.repository.JpaRepository

interface ShnippitRepository: JpaRepository<Shnippit, Long> {

    fun countByPublicId(publicId: String): Int

}