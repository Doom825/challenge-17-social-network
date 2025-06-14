const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
  reactionBody: { type: String, required: true, max: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now,
               get: timestamp => new Date(timestamp).toLocaleString() }
}, { toJSON: { getters: true } });

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, min: 1, max: 280 },
  createdAt: { type: Date, default: Date.now,
               get: timestamp => new Date(timestamp).toLocaleString() },
  username: { type: String, required: true },
  reactions: [reactionSchema]
},
{ toJSON: { virtuals: true, getters: true }, id: false });

thoughtSchema.virtual('reactionCount')
  .get(function() { return this.reactions.length; });

module.exports = model('Thought', thoughtSchema);
