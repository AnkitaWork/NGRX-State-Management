import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingItem } from './store/models/shopping-item.model';
import { Store } from '@ngrx/store';
import { AppState } from './app-state.model';
import { v4 as uuid } from 'uuid';
import { AddItemAction, DeleteItemAction, LoadShoppingAction } from './store/actions/shopping-item.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public shoppingItems: Observable<Array<ShoppingItem>>;
  public loading$: Observable<Boolean>;
  public error$: Observable<Error>;
  public newShoppingItem: ShoppingItem = { id: '', name: '' };

  constructor(private store: Store<AppState>) { }

  public addItem() {
    this.newShoppingItem.id = uuid();
    this.store.dispatch(new AddItemAction(this.newShoppingItem));
    this.newShoppingItem = { id: '', name: '' };
  }

  public deleteItem(id: string) {
    this.store.dispatch(new DeleteItemAction(id));
  }

  ngOnInit() {
    this.shoppingItems = this.store.select(store => store.shopping.list);
    this.loading$ = this.store.select(store => store.shopping.loading);
    this.error$ = this.store.select(store => store.shopping.error);

    this.store.dispatch(new LoadShoppingAction());

  }
}
