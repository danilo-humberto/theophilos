import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class UploadFileService {
  private client: SupabaseClient;
  private readonly proofBucket = process.env.SUPABASE_BUCKET_PROOF;
  private readonly raffleImageBucket = process.env.SUPABASE_BUCKET_RAFFLE_IMAGE;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );
  }

  async uploadProof(params: {
    file: Express.Multer.File;
    userId: string;
    saleId: string;
  }): Promise<{ path: string }> {
    const { file, userId, saleId } = params;
    if (!file) {
      throw new BadRequestException("Arquivo não encontrado");
    }

    if (!userId || !saleId) {
      throw new BadRequestException("userId e saleId são obrigatórios.");
    }

    const ext = this.getExtension(file.originalname);
    const key = `proofs/${userId}/${saleId}/${file.originalname}.${ext}`;

    const { error } = await this.client.storage
      .from(this.proofBucket!)
      .upload(key, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error)
      throw new InternalServerErrorException("Falha ao enviar comprovante.");

    return { path: key };
  }

  async getSignedProofUrl(
    path: string,
    seconds = 300
  ): Promise<{ url: string }> {
    if (!path) throw new BadRequestException("Path não encontrado.");

    const { data, error } = await this.client.storage
      .from(this.proofBucket!)
      .createSignedUrl(path, seconds);

    if (error || !data?.signedUrl)
      throw new InternalServerErrorException("Falha ao enviar comprovante.");

    return { url: data.signedUrl };
  }

  async uploadRaffleImage(params: {
    file: Express.Multer.File;
    userId: string;
    raffleId: string;
  }): Promise<{ path: string; url: string }> {
    const { file, userId, raffleId } = params;
    if (!file) {
      throw new BadRequestException("Arquivo não encontrado");
    }

    if (!userId || !raffleId) {
      throw new BadRequestException("userId e raffleId são obrigatórios.");
    }

    const ext = this.getExtension(file.originalname);
    const key = `raffleImages/${userId}/${raffleId}/${file.originalname}.${ext}`;

    const { error } = await this.client.storage
      .from(this.raffleImageBucket!)
      .upload(key, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error)
      throw new InternalServerErrorException("Falha ao enviar imagem da rifa.");

    const { data } = this.client.storage
      .from(this.raffleImageBucket!)
      .getPublicUrl(key);
    const url = data?.publicUrl;

    return { path: key, url };
  }

  private getExtension(filename: string) {
    const dot = filename.lastIndexOf(".");
    return dot >= 0 ? filename.slice(dot + 1).toLowerCase() : "bin";
  }
}
