import { SanatizeHtmlPipe } from './sanatize-html.pipe';

describe('SanatizeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SanatizeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
