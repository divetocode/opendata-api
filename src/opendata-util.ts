import util from 'util';

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

    static unwrapIfWrapped(payload: any) {
        // 케이스 1: { data: ... }
        if (payload && typeof payload === 'object' && 'data' in payload) {
            return payload.data;
        }
        // 케이스 2: { response: { body: { items: { item: [...] }}}}
        if (payload?.response?.body?.items?.item) {
            return payload.response.body.items.item;
        }
        return payload;
    }

    static extractFromXml(xmlObj: any) {
        // 보편적인 공공데이터 XML 구조
        const items = xmlObj?.response?.body?.items?.item;
        if (items) return items;
    
        throw new Error(util.inspect(xmlObj, { depth: null }));
    }
}

export default OpendataUtil;
