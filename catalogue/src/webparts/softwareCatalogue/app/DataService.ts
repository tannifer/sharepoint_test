export interface ITodo {
  id: number;
  title: string;
  done: boolean;
}

export interface IDataService {
  getTodos(hideFinishedTasks: boolean): angular.IPromise<ITodo[]>;
  addTodo(todo: string): angular.IPromise<{}>;
  deleteTodo(todo: ITodo): angular.IPromise<{}>;
  setTodoStatus(todo: ITodo, done: boolean): angular.IPromise<{}>;
}

export default class DataService implements IDataService {

  // To include HTTP, ensuure you inject each angular item
  public static $inject: string[] = ['$q', '$http'];

  private $http;

  // private items: ITodo[] = [
  //   {
  //     id: 1,
  //     title: 'Prepare demo Web Part',
  //     done: true
  //   },
  //   {
  //     id: 2,
  //     title: 'Show demo',
  //     done: false
  //   },
  //   {
  //     id: 3,
  //     title: 'Share code',
  //     done: false
  //   }
  // ];


  private items: ITodo[] = [];




  private nextId: number = 4;

  constructor(private $q: angular.IQService, $http: angular.IHttpService) {
    this.$http = $http;

  }

  public getTodos(hideFinishedTasks: boolean): angular.IPromise<ITodo[]> {
    const deferred: angular.IDeferred<ITodo[]> = this.$q.defer();

    //const todos: ITodo[] = [];
    const todos = [];
    this.$http.get("/sites/devtraining/kevin/_api/web/lists/getbytitle('Asset Register')/items")
      .then(function (response) {
        console.log(response.data);
        for (var i = 0; i < response.data.value.length; i++) {

          todos.push({ 'title': response.data.value[i].Title })

        }

      }, function (error) {
        console.log(error)
      });

    for (let i: number = 0; i < this.items.length; i++) {
      if (hideFinishedTasks && this.items[i].done) {
        continue;
      }

      todos.push(this.items[i]);
    }

    deferred.resolve(todos);

    return deferred.promise;
  }

  public addTodo(todo: string): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    this.items.push({
      id: this.nextId++,
      title: todo,
      done: false
    });

    deferred.resolve();

    return deferred.promise;
  }

  public deleteTodo(todo: ITodo): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    let pos: number = -1;
    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].id === todo.id) {
        pos = i;
        break;
      }
    }

    if (pos > -1) {
      this.items.splice(pos, 1);
      deferred.resolve();
    }
    else {
      deferred.reject();
    }

    return deferred.promise;
  }

  public setTodoStatus(todo: ITodo, done: boolean): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].id === todo.id) {
        this.items[i].done = done;
      }
    }

    deferred.resolve();

    return deferred.promise;
  }
}