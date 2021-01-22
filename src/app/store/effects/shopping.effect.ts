import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShoppingService } from 'src/app/shopping.service';
import { LoadShoppingAction, ShoppingActionTypes, LoadShoppingSuccessAction, LoadShoppingFailureAction, AddItemAction, AddItemSuccessAction, AddItemFailureAction, DeleteItemAction, DeleteItemSuccessAction } from '../actions/shopping-item.action';

@Injectable()
export class ShoppingEffects {
    @Effect() loadingShopping$ = this.action$.pipe(
        ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),mergeMap(
            () => this.shoppingService.getShoppingItems().pipe(
                map(data => { return new LoadShoppingSuccessAction(data)}),
                catchError(error => of(new LoadShoppingFailureAction(error)))
            ) 
        )
    )

    @Effect() addShoppingItem$ = this.action$.pipe(
        ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),mergeMap(
            (data)=> this.shoppingService.addShoppingItem(data.payload).pipe(
                map(() => { return new AddItemSuccessAction(data.payload)}),
                catchError(error => of(new AddItemFailureAction(error)))
            )
        )
    )

    @Effect() deleteShoppingItem$ = this.action$.pipe(
        ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),mergeMap(
            (data) => this.shoppingService.deleteShoppingItem(data.payload).pipe(
                map(() => {return new DeleteItemSuccessAction(data.payload)}),
                catchError(error => of(new DeleteItemSuccessAction(error)))
            )
        )
    )

    constructor(private action$: Actions, private shoppingService: ShoppingService) { }
}