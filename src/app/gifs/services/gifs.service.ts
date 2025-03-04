import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifFromLocalStorage);
  console.log(gifs);
  return gifs;
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);

  searchHistory = signal<Record<string,Gif[]>>(loadFromLocalStorage());
  searchKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.getGifs();
  }

  saveGifsToLocalStorage = effect(() =>{
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  getGifs(){
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params:{
        api_key:environment.giphyApiKey,
        limit: 10
      }
    }).subscribe(
      (res) =>{
        const gifs = GifMapper.mapGiphyItemsToGifsArray(res.data);
        this.trendingGifs.set(gifs);
      }
    );
  }

  getSearchGifs(query: string){
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params:{
        api_key: environment.giphyApiKey,
        q: query,
        limit: 10
      }
    }).pipe(
      map(({data}) => GifMapper.mapGiphyItemsToGifsArray(data)),
      tap(data =>{
        this.searchHistory.update((history)=>({
          ...history,
          [query.toLocaleLowerCase()]: data
        }))
      })
    );
  }

  getHistoryGifs(query: string):Gif[]{
    return this.searchHistory()[query] ?? [];
  }
}
