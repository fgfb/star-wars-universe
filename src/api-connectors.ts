import ky from 'ky';

export async function getApi<T>(url: string): Promise<T> {
    return await ky.get<T>(url).json();
}