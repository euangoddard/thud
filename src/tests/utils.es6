import should from 'should';


export let throws_instance_of = (func, error_type) => {
    try {
        func();
    } catch (err) {
        err.should.be.instanceof(error_type);
    }

};
