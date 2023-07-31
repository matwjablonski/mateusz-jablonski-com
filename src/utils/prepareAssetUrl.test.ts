import prepareAssetUrl from './prepareAssetUrl';

describe('prepareAssetUrl', () => {
  it('should add https before url', () => {
    const testedUrl = 'abc.pl'
    const result = prepareAssetUrl(testedUrl);
 
    expect(result).toBe(`https://${testedUrl}`);
  });

  it('should replace http with https for tested url', () => {
    const testedUrl = 'abc.pl';
    const result = prepareAssetUrl(`http://${testedUrl}`);

    expect(result).toBe(`https://${testedUrl}`);
  });
});
