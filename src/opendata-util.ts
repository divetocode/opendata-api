class OpendataUtil {

    /**
     * 현재 한국 기준 연도, 월, 일과 yyyymmdd 형식을 반환합니다.
     * @returns {{ year: string, month: string, day: string, yyyymmdd: string }}
     */
    static getKoreanDateInfo() {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const koreaTime = new Date(utc + 9 * 60 * 60000);

        const year = koreaTime.getFullYear().toString();
        const month = (koreaTime.getMonth() + 1).toString().padStart(2, '0');
        const day = koreaTime.getDate().toString().padStart(2, '0');

        return {
            year,
            month,
            day,
            yyyymmdd: `${year}${month}${day}`
        };
    }
}

export default OpendataUtil;
