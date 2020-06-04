package net.fvogel.radshift.shnippit.model

import javax.persistence.*

@Entity
@Table(name = "shnippit")
data class Shnippit(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "public_id", columnDefinition = "char(16)", unique = true, length = 16, nullable = false)
    var publicId: String? = null,

    @Lob
    @Column(name = "text", columnDefinition = "text", nullable = true)
    var text: String? = null,

    @Column(name = "type", columnDefinition = "char(16)", nullable = false)
    var type: Type = Type.RAW

)