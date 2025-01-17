import { EventEmitter, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';

import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})

export class GraphqlService {
  public owners: any;
  public owner: any;
  public createdOwner: any;
  public updatedOwner: any;
  private key: string = 'da2-kpri4rkkvff25eutvkohvyzbdm';
  public incidentList = new EventEmitter();
  public results: any;

  constructor(private apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'https://xsksoss2sneujaauha6u5wqzsq.appsync-api.us-west-1.amazonaws.com/graphql' }),
      cache: new InMemoryCache()
    })
  }

  public getIncidents(){
    return this.apollo.query({
      query: gql`query MyQuery {
        listOccurences {
          address
          data
          id
          image
          title
          user
          status
        }
      }`,
      context: {
        headers: new HttpHeaders().set('x-api-key', this.key), 
      }
    })
  }

  public getUser(){
    return this.apollo.query({
      query: gql`query MyQuery {
        listUsers {
          id
          address
          email
          name
          phone
        }
      }`,
      context: {
        headers: new HttpHeaders().set('x-api-key', this.key), 
      }
    })
  }
}