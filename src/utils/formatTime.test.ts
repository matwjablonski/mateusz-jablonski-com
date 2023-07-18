import { formatTime, convertMinutesToTimeObject } from './formatTime';

describe('formatTime', () => {
  it('should format 3820 seconds which is more than 1 hour into proper format', () => {
    const result = formatTime(3820);

    expect(result).toBe('1:03:40');
  });

  it('should format 3410 seconds which is less than 1 hour into proper format', () => {
    const result = formatTime(3410);

    expect(result).toBe('56:50');
  });

  it('should format 52 seconds which is less than 1 minute into proper format', () => {
    const result = formatTime(52);

    expect(result).toBe('00:52');
  });
});

describe('convertMinutesToTimeObject', () => {
  it('should format 3820 minutes into proper format', () => {
    const result = convertMinutesToTimeObject(3820);

    expect(result).toEqual({
      hours: 63,
      minutes: 40,
    });
  });
});
