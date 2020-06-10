package net.fvogel.radshift.shnippit.service

import net.fvogel.radshift.shnippit.persistence.ShnippitRepository
import org.springframework.stereotype.Service
import java.util.concurrent.ThreadLocalRandom
import kotlin.streams.asSequence

@Service
class PublicIdService(val shnippitRepository: ShnippitRepository) {

    private val charPool : List<Char> = ('a'..'z') + ('A'..'Z') + ('0'..'9')
    private val defaultLength : Int = 6

    fun createPublicId(length: Int = defaultLength): String {
        var publicId = "";
        var exists = true;
        do {
            publicId = createRandomAlphanumericString(length);
            exists = exists(publicId)
        } while (exists)

        return publicId;
    }

    private fun exists(publicId: String): Boolean {
        return shnippitRepository.countByPublicId(publicId) > 0
    }

    private fun createRandomAlphanumericString(length: Int): String {
        return ThreadLocalRandom.current()
                .ints(length.toLong(), 0, charPool.size)
                .asSequence()
                .map(charPool::get)
                .joinToString("")
    }
}