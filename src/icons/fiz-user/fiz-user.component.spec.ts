import { testIcon } from '../../test/icon';
import { FizTrashBinComponent } from '../fiz-trash-bin/fiz-trash-bin.component';
import { FizUserComponent } from './fiz-user.component';

describe('FizUserComponent', () => {
    testIcon<FizTrashBinComponent>(FizUserComponent);
});
