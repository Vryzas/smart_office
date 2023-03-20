import { Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as ffmpeg from 'fluent-ffmpeg';

@Controller('video')
export class VideoController {
  @Get()
  async joinVideos() {
    const video1Path = '/Users/vitorcosta/Projetos/mock_office/merge_videos/video1.mp4';
    const video2Path = '/Users/vitorcosta/Projetos/mock_office/merge_videos/video2.mp4';
    const outputPath = '/Users/vitorcosta/Projetos/mock_office/merge_videos/temp/new.mp4';

    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(video1Path)
        .input(video2Path)
        .on('error', (err) => {
          reject(err);
        })
        .on('end', () => {
          resolve(outputPath);
        })
        .mergeToFile(outputPath);
    });
  }

  @Post('merge')
  @UseInterceptors(FilesInterceptor('files'))
  async mergeVideos(@UploadedFiles() files) {
    const video1 = files[0].path;
    const video2 = files[1].path;
    const outputPath = path.resolve(__dirname, '../..', `merge_videos/temp/${new Date()}.mp4`);

    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(video1)
        .input(video2)
        .on('error', (err) => {
          reject(err);
        })
        .on('end', () => {
          resolve(outputPath);
        })
        .mergeToFile(outputPath);
    });
  }
  /* requires:
    sudo apt-get install ffmpeg (linux)
    brew install ffmpeg (macOS)
*/
}
