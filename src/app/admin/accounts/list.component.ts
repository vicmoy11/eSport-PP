import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountService } from '@app/_services';
import { Account } from '@app/_models';
declare var $: any;

@Component({ selector: 'app-list', templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    accounts: any[];

    constructor(private accountService: AccountService, private router: Router) {}

    ngOnInit() {
        this.accountService.getAll()
            //.pipe(first())
            //.subscribe(accounts => this.accounts = accounts);
            $(document).ready(function () {
                $('#accountsTable').DataTable();

            });
    }

    goToNextPage() {
        // Navigate to the next page route
        this.router.navigate(['next-page-route']);
      }

    deleteAccount(id: string) {
        const account = this.accounts.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id) 
            });
    }
}