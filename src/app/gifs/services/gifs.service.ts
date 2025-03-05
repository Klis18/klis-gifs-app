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
  trendingGifsLoading = signal(false);
  trendingPage = signal(0);

  searchGifs = signal<Gif[]>([]);
  searchPage = signal(0);
  searchGifsLoading = signal(false);

  searchHistory = signal<Record<string,Gif[]>>(loadFromLocalStorage());
  searchKeys = computed(() => Object.keys(this.searchHistory()));


  trendingGifGroup = computed<Gif[][]>(() =>{
    const groups = [];
    for(let i = 0; i <= this.trendingGifs().length; i+=3){
      groups.push(this.trendingGifs().slice(i, i+3));
    }
    return groups;
  })

  searchGifsGroup = computed<Gif[][]>(() =>{
    const groups = [];
    for(let i = 0; i <= this.searchGifs().length; i+=3){
      groups.push(this.searchGifs().slice(i, i+3));
    }
    return groups;
  })

  constructor() {
    this.getTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() =>{
      const historyString = JSON.stringify(this.searchHistory());
      localStorage.setItem(GIF_KEY, historyString);
  });

  getTrendingGifs(){

    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true); 

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20,
      }
    }).subscribe(
      (res) =>{
        const gifs = GifMapper.mapGiphyItemsToGifsArray(res.data);
        this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.trendingPage.update((page) => page + 1);
        // this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
      }
    );
  }

  getSearchGifs(query: string){
    if(this.searchGifsLoading()) return;

    this.searchGifsLoading.set(true);

    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params:{
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20
      }
    }).pipe(
      map(({data}) => data ),
      map((item) => GifMapper.mapGiphyItemsToGifsArray(item)),
      tap(item =>{
          this.searchHistory.update((history)=>({
            ...history,
            [query.toLocaleLowerCase()]: item
          }));

        // this.searchGifs.update((searchGifs) => [...searchGifs, ...item]),
        // this.searchPage.update((page) => page +1);
        // this.searchGifsLoading.set(false);
      }),

    );
  }

  getHistoryGifs(query: string):Gif[]{
    return this.searchHistory()[query] ?? [];
  }
}
