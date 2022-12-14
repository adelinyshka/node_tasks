import { Transform, pipeline } from "node:stream";

const transform = async () => {

    pipeline(
        process.stdin,
        new Transform({
            transform(chunk, _encoding, callback) {
              callback(null, chunk.reverse()+ '\n');
            },
        }),
        process.stdout,
        error => console.error(error)
    );
};

await transform();