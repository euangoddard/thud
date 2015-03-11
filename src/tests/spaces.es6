import should from 'should';

import {throws_instance_of} from './utils';
import {Space,SpaceError} from '../spaces';


describe('Spaces', () => {
  it('should accept a string as a reference', () => {
    let space = new Space('A1');
    space.ref.should.equal('A1');
  });

  it('should also accept coordinates', () => {
    let space = new Space([0, 0]);
    space.ref.should.equal('A1');
  });

  it('should be represented as coordinates', () => {
    let space = new Space('A1');
    space.coordinates.should.be.Array;
    space.coordinates.length.should.equal(2);
    space.coordinates[0].should.equal(0);
    space.coordinates[1].should.equal(0);
  });

  it('should allow for reference updating', () => {
    let space = new Space('A1');
    space.ref = 'B2';
    space.ref.should.equal('B2');
    space.coordinates.should.be.Array;
    space.coordinates.length.should.equal(2);
    space.coordinates[0].should.equal(1);
    space.coordinates[1].should.equal(1);
  });

  it('should allow for updates by coordinates', () => {
    let space = new Space('A1');
    space.coordinates = [1, 1];
    space.ref.should.equal('B2');
  });

  it('should not accept "I" as a column reference in the constructor', () => {
    throws_instance_of(() => {
      new Space('I1');
    }, SpaceError);
  });

  it('should not accept "I" as a column reference when setting the reference', () => {
    let space = new Space('A1');
    throws_instance_of(() => {
      space.ref = 'I1';
    }, SpaceError);

  });

  it('should not accept 0 as a row reference in the constructor', () => {
    throws_instance_of(() => {
      new Space('A0');
    }, SpaceError);
  });

  it('should not accept 0 as a row reference when setting the reference', () => {
    let space = new Space('A1');
    throws_instance_of(() => {
      space.ref = 'A0';
    }, SpaceError);
  });

});