import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    featured_image: string;
    featured_post: boolean;
    created_at: Date;
    no_of_views: number;
    reading_time: string;
    tags: string[];
}

const BlogSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    featured_image: {
        type: String,
        required: true
    },
    featured_post: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    no_of_views: {
        type: Number,
        default: 0
    },
    reading_time: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    }
});


const Blog : Model<IBlog> = mongoose.model<IBlog>('blog', BlogSchema)

export default Blog