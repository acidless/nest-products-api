import * as mongoose from 'mongoose';
import { Document, HookNextFunction } from 'mongoose';

/*====================*/

export type SoftDeletesDocument = Document & {
  deletedAt: Date | null;
};

/*====================*/

export default function softDeletes(schema: mongoose.Schema) {
  schema.add({
    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
  });

  const setDocumentDeleted = async (doc: SoftDeletesDocument) => {
    doc.deletedAt = new Date();
    doc.$isDeleted(true);
    await doc.save();
  };

  schema.pre(
    /^find/,
    function (
      this: mongoose.Query<any, SoftDeletesDocument>,
      next: HookNextFunction,
    ) {
      this.where({ deletedAt: null });
      next();
    },
  );

  schema.pre(
    /delete|remove/i,
    { document: true },
    async function (this: SoftDeletesDocument, next: HookNextFunction) {
      await setDocumentDeleted(this);

      next();
    },
  );
}
