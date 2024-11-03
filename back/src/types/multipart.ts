import { Type, Static } from "@sinclair/typebox";


export const FileSchema = Type.Object(
    {
        type: Type.Literal("file"),
        fieldname: Type.String(),
        filename: Type.String(),
        encoding: Type.String(),
        mimetype: Type.String(),
        file: Type.Object({}), // Para manejar el FileStream  
        _buf: Type.Object({}), // Buffer del archivo  
    },
    { additionalProperties: false }
);

export const MultiPartSchema = Type.Object(
    {
        image: Type.Optional(FileSchema),
    },
    { additionalProperties: false }
);

export type MultiPartType = Static<typeof MultiPartSchema>;
export type FileSchemaType = Static<typeof FileSchema>;
