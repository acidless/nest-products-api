import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

/*====================*/

export default function hideData(schema: mongoose.Schema) {
  schema.methods.hideData = async function (this: Document) {
    Object.keys(this.schema.paths).forEach((key) => {
      const value = this.schema.paths[key];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (value.options.select === false) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this[value.path] = undefined;
      }
    });
  };
}
