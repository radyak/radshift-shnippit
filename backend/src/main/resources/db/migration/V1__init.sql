CREATE TABLE shnippit (
    id          bigserial not null,
    public_id   char(16) not null,
    text        text,
    constraint uk_public_id unique (public_id)
)