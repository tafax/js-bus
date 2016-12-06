
import { suite, test } from 'mocha-typescript';
import 'should';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import 'sinon-as-promised';
import * as Promise from 'bluebird';

import { FunctionConstructorMessageTypeExtractor } from '../../../src/Extractor/FunctionConstructorMessageTypeExtractor';

@suite class FunctionConstructorMessageTypeExtractorUnitTest {

  extractor: FunctionConstructorMessageTypeExtractor;

  before() {
    this.extractor = new FunctionConstructorMessageTypeExtractor();
  }

  @test 'should extract the correct class to an object'() {
    class TestClassToExtract {}
    this.extractor.extract(new TestClassToExtract()).should.be.eql(TestClassToExtract);
  }

}
