import { Injectable } from '@angular/core';

import { Folder } from './model';
import { StorageApiService } from './storage-api.service';

@Injectable()
export class StorageService {
    private path: Folder[] = [];
    private root: Folder;

    constructor(public storageApiService: StorageApiService) { }

    getPath(): Folder[] {
        if (this.path.length === 0) {
            this.path.push(this.getRoot());
        }
        return this.path;
    }

    getRoot(): Folder {
        if (!this.root) {
            this.root = new Folder('root');
        }
        return this.root;
    }

    getCurrent(): Folder {
        const path = this.getPath();
        return path[path.length - 1];
    }

    getParent(): Folder {
        const path = this.getPath();
        return (path.length > 1) ? path[path.length - 2] : null;
    }

    getPathAsString(): string {
        let result = '';
        this.getPath().map((item, index) => {
            if (index === 0) {
                // skip root folder
                return;
            }
            result += (result ? '/' : '') + item.getName();
        });
        return result;
    }

    openFolder(folder: Folder): Folder {
        if (this.getCurrent().hasFolder(folder)) {
            this.getPath().push(folder);
        } else {
            const position = this.path.indexOf(folder);
            if (position >= 0) {
                this.getPath().splice(position + 1);
            }
        }
        return folder;
    }

    openPath(path: string) {
        this.path = [this.getRoot()];
        path.split('/').splice(2).filter((item) => item).map((folderName: string) => {
            const folder = this.getCurrent().getFolderByName(folderName);
            this.openFolder(folder);
        });
    }

    isRoot(folder: Folder = this.getCurrent()): boolean {
        return folder === this.getRoot();
    }

    save() {
        this.storageApiService.save(this.root);
    }

    load() {
        this.root = this.storageApiService.load() || this.getRoot();
    }
}
