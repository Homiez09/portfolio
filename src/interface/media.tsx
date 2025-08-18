export interface IProviderMetadata {
    public_id: string;
    resource_type: string;
}

export interface IImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
    provider_metadata: IProviderMetadata;
}

export interface IImageFormats {
    large?: IImageFormat;
    small?: IImageFormat;
    medium?: IImageFormat;
    thumbnail?: IImageFormat;
}

export interface IMedia {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: IImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: IProviderMetadata;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}
