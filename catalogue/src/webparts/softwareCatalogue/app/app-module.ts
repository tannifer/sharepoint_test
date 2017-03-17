import * as angular from 'angular';
import CatalogueController from './CatalogueController';
import DataService from './DataService';

const todoapp: angular.IModule = angular.module('todoapp', []);

todoapp
  .controller('CatalogueController', CatalogueController)
  .service('DataService', DataService);