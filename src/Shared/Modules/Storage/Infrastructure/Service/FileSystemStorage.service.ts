import { IFileStorageService } from '../../Domain/Services/IFileStorage.service';
import * as fs from 'fs';
import * as path from 'path';

export class LocalFileStorageService implements IFileStorageService {
  async saveFiles(
    customerId: number,
    customerName: string,
    files: Record<string, Express.Multer.File[] | undefined>,
  ): Promise<Record<string, string[]>> {
    const folderName = `${customerId}-${customerName.replace(/\s+/g, '_')}`;
    const basePath = path.join(__dirname, '../../../../uploads', folderName);

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }

    const savedPaths: Record<string, string[]> = {};

    for (const [field, fileList] of Object.entries(files)) {
      if (!fileList) continue;

      savedPaths[field] = [];

      for (const file of fileList) {
        const filePath = path.join(basePath, file.originalname);
        fs.writeFileSync(filePath, file.buffer);
        savedPaths[field].push(filePath);
      }
    }

    return savedPaths;
  }

    async saveDraftsFile(
    customerId: number,
    customerName: string,
    files: Record<string, Express.Multer.File[] | undefined>,
  ): Promise<Record<string, string[]>> {
    const folderName = `${customerId}-${customerName.replace(/\s+/g, '_')}`;
    const basePath = path.join(__dirname, '../../../../draft-uploads', folderName);

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }

    const savedPaths: Record<string, string[]> = {};

    for (const [field, fileList] of Object.entries(files)) {
      if (!fileList) continue;

      savedPaths[field] = [];

      for (const file of fileList) {
        const filePath = path.join(basePath, file.originalname);
        fs.writeFileSync(filePath, file.buffer);
        savedPaths[field].push(filePath);
      }
    }

    return savedPaths;
  }
}
