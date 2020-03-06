import { series, src, dest, watch } from 'gulp';
import { BootLoadTask } from './boot/load/task';


 
exports.default = series(BootLoadTask.Instance.taskScan ,BootLoadTask.Instance.taskProject);
