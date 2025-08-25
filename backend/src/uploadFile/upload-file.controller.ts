import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UploadFileService } from "./upload-file.service";

@Controller("upload-files")
export class UploadFileController {}
