
import { suite, test } from '@js-bus/test';
import { FunctionConstructorMessageTypeExtractor } from '../../../../../../src/lib/message-handler/mapper/class-map/extractor/function-constructor.message-type-extractor';

@suite class FunctionConstructorMessageTypeExtractorUnitTests {

  private extractor: FunctionConstructorMessageTypeExtractor;

  before() {
    this.extractor = new FunctionConstructorMessageTypeExtractor();
  }

  @test 'should extract the correct class to an object'() {
    class TestClassToExtract {}
    this.extractor.extract(new TestClassToExtract()).should.be.eql(TestClassToExtract);
  }

}
