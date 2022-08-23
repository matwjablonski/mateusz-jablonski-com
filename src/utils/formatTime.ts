export const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 60 / 60);
    const minutes = Math.floor(seconds / 60 % 60);
    const restSeconds = Math.floor(seconds % 60);

    return `
        ${hours > 0 ? `${hours}:` : ''}
        ${minutes > 0 ? `${minutes.toString().padStart(2, '0')}:` : '00:'}
        ${restSeconds.toString().padStart(2, '0')}
    `;
} 