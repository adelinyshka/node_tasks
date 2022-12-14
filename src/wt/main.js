import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { Worker } from 'worker_threads';
import { cpus } from 'os';

export const performCalculations = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const workerPath = path.join(__dirname, '/worker.js');
    const cp = cpus();
    let incNum = 10;

    const workersData = await Promise.allSettled(cp.map(() => {
        return new Promise((resolve, reject) => {

            const wrkr = new Worker(workerPath, {
                workerData: incNum++
            });
            wrkr.on("message", resolve);
            wrkr.on("error", reject);
        });
    }));

    const res = workersData.map(({ status, value }) =>
        status === "fulfilled"
            ? {
                status: "resolved",
                data: value,
            }
            : {
                status: "error",
                data: null,
            }
    );

    console.log(res);
    return res;
};

await performCalculations();
