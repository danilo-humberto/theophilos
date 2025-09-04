import { BadRequestException, Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class UploadFileService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
      {
        auth: {
          persistSession: false,
        },
      }
    );
  }
  async upload(
    file: Express.Multer.File,
    objectPath: string,
    bucket: string,
    isPublic = false
  ) {
    const { data, error } = await this.client.storage
      .from(bucket)
      .upload(objectPath, file.buffer, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.mimetype,
      });

    if (error) throw new BadRequestException(error.message);

    if (isPublic) {
      const { data: publico } = this.client.storage
        .from(bucket)
        .getPublicUrl(data.path);
      return { path: data.path, publicUrl: publico.publicUrl };
    }

    return { path: data.path };
  }

  async createSignedUrl(bucket: string, path: string, expiresIn = 600) {
    const { data, error } = await this.client.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) throw new BadRequestException(error.message);
    return data.signedUrl;
  }
}
