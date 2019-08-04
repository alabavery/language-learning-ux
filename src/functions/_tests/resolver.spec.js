import { splitTranscriptIntoStrings, MIN_REQUIRED_LEN_TO_RESOLVE } from '../resolver';

const filterInCaseMinLengthChanges = expectedResults =>
    expectedResults.filter(result => result.rawStr.length >= MIN_REQUIRED_LEN_TO_RESOLVE);

describe('splitTranscriptIntoStrings', () => {
   it('a b', () => {
      expect(
         splitTranscriptIntoStrings('a b'),
      ).toEqual([]);
   });
   it('abc def', () => {
      expect(
          splitTranscriptIntoStrings('abc def'),
      ).toEqual(
          filterInCaseMinLengthChanges([
             { rawStr: 'abc', locationInTranscript: 0 },
             { rawStr: 'def', locationInTranscript: 4 }
          ]),
      );
   });
   it('.abc. .def.', () => {
      expect(
          splitTranscriptIntoStrings('.abc. .def.'),
      ).toEqual(
          filterInCaseMinLengthChanges([
             { rawStr: 'abc', locationInTranscript: 0 },
             { rawStr: 'def', locationInTranscript: 4 }
          ]),
      );
   });
   it('abcd efgh', () => {
      expect(
          splitTranscriptIntoStrings('abcd efgh'),
      ).toEqual(
          filterInCaseMinLengthChanges([
            { rawStr: 'abcd', locationInTranscript: 0 },
            { rawStr: 'efgh', locationInTranscript: 5 }
         ]),
       );
   });
   it('abcd  efgh', () => {
      expect(
          splitTranscriptIntoStrings('abcd  efgh'),
      ).toEqual(
          filterInCaseMinLengthChanges([
            { rawStr: 'abcd', locationInTranscript: 0 },
            { rawStr: 'efgh', locationInTranscript: 6 }
         ]),
       );
   });
   it('abcd.  .efgh', () => {
      expect(
          splitTranscriptIntoStrings('abcd.  .efgh'),
      ).toEqual(
          filterInCaseMinLengthChanges([
            { rawStr: 'abcd', locationInTranscript: 0 },
            { rawStr: 'efgh', locationInTranscript: 8 }
         ]),
       );
   });
   it('abcd.  .efgh.', () => {
      expect(
          splitTranscriptIntoStrings('abcd.  .efgh.'),
      ).toEqual(
          filterInCaseMinLengthChanges([
            { rawStr: 'abcd', locationInTranscript: 0 },
            { rawStr: 'efgh', locationInTranscript: 8 }
         ]),
       );
   });
   it('.abcd.  .efgh.', () => {
      expect(
          splitTranscriptIntoStrings('.abcd.  .efgh.'),
      ).toEqual(
          filterInCaseMinLengthChanges([
            { rawStr: 'abcd', locationInTranscript: 1 },
            { rawStr: 'efgh', locationInTranscript: 9 }
         ]),
       );
   });
   it('.abcd.  .efgh. hello', () => {
      expect(
          splitTranscriptIntoStrings('.abcd.  .efgh. hello'),
      ).toEqual(
          filterInCaseMinLengthChanges([
            { rawStr: 'abcd', locationInTranscript: 1 },
            { rawStr: 'efgh', locationInTranscript: 9 },
            { rawStr: 'hello', locationInTranscript: 15 }
         ]),
       );
   });
   it('         ', () => {
      expect(
          splitTranscriptIntoStrings('         '),
      ).toEqual([]);
   });
   it('"abcd"', () => {
      expect(
          splitTranscriptIntoStrings('"abcd"'),
      ).toEqual(
          filterInCaseMinLengthChanges([
            { rawStr: 'abcd', locationInTranscript: 1 },
         ]),
       );
   });
   it('"abcd." Hello', () => {
      expect(
          splitTranscriptIntoStrings('"abcd." Hello'),
      ).toEqual(
          filterInCaseMinLengthChanges([
            { rawStr: 'abcd', locationInTranscript: 1 },
            { rawStr: 'Hello', locationInTranscript: 8 },
         ]),
       );
   });
   it('"abcd." Hello', () => {
      expect(
          splitTranscriptIntoStrings('"abcd." "Hello"'),
      ).toEqual(
          filterInCaseMinLengthChanges([
            { rawStr: 'abcd', locationInTranscript: 1 },
            { rawStr: 'Hello', locationInTranscript: 9 },
         ]),
       );
   });
});

describe('getResolveData', () => {

});