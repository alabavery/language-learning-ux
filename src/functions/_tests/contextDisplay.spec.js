import { getBookendsOfContext } from "../contextDisplay";

describe('getBookendsOfContext', () => {
    it('Handles word at beginning', () => {
       expect(
           getBookendsOfContext(
               "Hello, this is a sentence.",
               0,
           )
       ).toEqual({
          start: 0,
          end: 25,
       });
    });
    it('Handles second word', () => {
        expect(
            getBookendsOfContext(
                "Hello, this is a sentence.",
                7,
            )
        ).toEqual({
            start: 0,
            end: 25,
        });
    });
    it('Handles not first sentence', () => {
        expect(
            getBookendsOfContext(
                "Hello, this is a sentence. This is another sentence.",
                27,
            )
        ).toEqual({
            start: 27,
            end: 51, // length of string - 1
        });
    });
});