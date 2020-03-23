describe('The comment module', ()=>{

    it('should initialize with 1 comment', ()=>{
        expect(commentModule.comments.length).toBe(1);
    })

    it('should initialize with current_user data', ()=>{
        expect(commentModule.comments[0].user.name).toBe("Michael");
    })

});

describe('New comments', ()=>{

    it('should be created with custom body text', ()=>{
        let c = new Comment("Hello world")
        expect(c.body).toBe("Hello world");
    })

    it('should get user info from current_user data', ()=>{
        let comment = new Comment("Hello world")
        expect(comment.user.name).toBe("Michael");
    })

    it('should use new user info when current_user is updated', ()=>{
        current_user.name = "David"
        let comment = new Comment("Hello world")
        expect(comment.user.name).toBe("David");
    })

});