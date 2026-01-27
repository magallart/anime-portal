import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { GraphqlClientService } from './graphql-client.service';

describe('GraphqlClientService', () => {
  let service: GraphqlClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(GraphqlClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('returns typed data when the request succeeds', async () => {
    const query = 'query Viewer { Viewer { id } }';
    const promise = firstValueFrom(service.execute<{ Viewer: { id: number } }>(query));

    const req = httpMock.expectOne(environment.anilistApiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ query });

    req.flush({ data: { Viewer: { id: 123 } } });

    await expect(promise).resolves.toEqual({ Viewer: { id: 123 } });
  });

  it('throws a GraphqlClientError when response contains GraphQL errors', async () => {
    const query = 'query Broken { Viewer { id } }';
    const promise = firstValueFrom(service.execute<{ Viewer: { id: number } }>(query));

    const req = httpMock.expectOne(environment.anilistApiUrl);
    req.flush(
      { errors: [{ message: 'Bad field', locations: [{ line: 1, column: 7 }] }] },
      { status: 200, statusText: 'OK' },
    );

    await expect(promise).rejects.toMatchObject({
      graphQLErrors: [{ message: 'Bad field' }],
    });
  });

  it('wraps network failures in GraphqlClientError', async () => {
    const query = 'query Viewer { Viewer { id } }';
    const promise = firstValueFrom(service.execute<{ Viewer: { id: number } }>(query));

    const req = httpMock.expectOne(environment.anilistApiUrl);
    req.error(new ProgressEvent('error'), { status: 500, statusText: 'Server error' });

    await expect(promise).rejects.toMatchObject({
      status: 500,
    });
  });
});
