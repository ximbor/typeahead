export class PostComment {

    name: string;
    email: string;
    body: string;

    static bodyIndex = (comment: PostComment, text: string): number => comment.body.toLowerCase().indexOf(text.toLowerCase());
    static nameIndex = (comment: PostComment, text: string): number => comment.name.toLowerCase().indexOf(text.toLowerCase());
    static emailIndex = (comment: PostComment, text: string): number => comment.email.toLowerCase().indexOf(text.toLowerCase());

    static hasText(comment: PostComment, text: string): boolean {
        return  this.bodyIndex(comment, text) >= 0 ||
                this.nameIndex(comment, text) >= 0 ||
                this.emailIndex(comment, text) >= 0;
    }

}
