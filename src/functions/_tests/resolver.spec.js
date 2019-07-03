import { splitTranscriptIntoStrings } from '../resolver';

describe('splitTranscriptIntoStrings', () => {
   it('a b', () => {
      expect(
         splitTranscriptIntoStrings('a b'),
      ).toEqual([]);
   });
   it('abc def', () => {
      expect(
          splitTranscriptIntoStrings('abc def'),
      ).toEqual([
         { rawStr: 'abc', locationInTranscript: 0 },
         { rawStr: 'def', locationInTranscript: 4 }
      ]);
   });
   it('abc  def', () => {
      expect(
          splitTranscriptIntoStrings('abc  def'),
      ).toEqual([
         { rawStr: 'abc', locationInTranscript: 0 },
         { rawStr: 'def', locationInTranscript: 5 }
      ]);
   });
   it('abc.  .def', () => {
      expect(
          splitTranscriptIntoStrings('abc.  .def'),
      ).toEqual([
         { rawStr: 'abc', locationInTranscript: 0 },
         { rawStr: 'def', locationInTranscript: 7 }
      ]);
   });
   it('abc.  .def.', () => {
      expect(
          splitTranscriptIntoStrings('abc.  .def.'),
      ).toEqual([
         { rawStr: 'abc', locationInTranscript: 0 },
         { rawStr: 'def', locationInTranscript: 7 }
      ]);
   });
   it('.abc.  .def.', () => {
      expect(
          splitTranscriptIntoStrings('.abc.  .def.'),
      ).toEqual([
         { rawStr: 'abc', locationInTranscript: 1 },
         { rawStr: 'def', locationInTranscript: 8 }
      ]);
   });
   it('.abc.  .def. hello', () => {
      expect(
          splitTranscriptIntoStrings('.abc.  .def. hello'),
      ).toEqual([
         { rawStr: 'abc', locationInTranscript: 1 },
         { rawStr: 'def', locationInTranscript: 8 },
         { rawStr: 'hello', locationInTranscript: 13 }
      ]);
   });
   it('         ', () => {
      expect(
          splitTranscriptIntoStrings('         '),
      ).toEqual([]);
   });
   it('"abc"', () => {
      expect(
          splitTranscriptIntoStrings('"abc"'),
      ).toEqual([
         { rawStr: 'abc', locationInTranscript: 1 },
      ]);
   });
   it('"abc." Hello', () => {
      expect(
          splitTranscriptIntoStrings('"abc." Hello'),
      ).toEqual([
         { rawStr: 'abc', locationInTranscript: 1 },
         { rawStr: 'Hello', locationInTranscript: 7 },
      ]);
   });
   it('"abc." Hello', () => {
      expect(
          splitTranscriptIntoStrings('"abc." "Hello"'),
      ).toEqual([
         { rawStr: 'abc', locationInTranscript: 1 },
         { rawStr: 'Hello', locationInTranscript: 8 },
      ]);
   });
});