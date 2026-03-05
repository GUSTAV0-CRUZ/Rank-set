/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { MatchRepository } from './repository/match.repository';
import { createMatch } from 'src/utils/match/create-match';
import { BadRequestException } from '@nestjs/common';

describe('MatchService', () => {
  let matchService: MatchService;
  let matchRepository: MatchRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: MatchRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOneId: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    matchService = module.get<MatchService>(MatchService);
    matchRepository = module.get<MatchRepository>(MatchRepository);
  });

  it('should be defined', () => {
    expect(matchService).toBeDefined();
  });

  describe('create', () => {
    it('Should return new match', async () => {
      const matchCreate = createMatch();
      const match = {
        match: 'any Caategory',
        players: ['idPlayerOne', 'idPlayerTwo'],
      };

      jest.spyOn(matchRepository, 'create').mockResolvedValue({
        ...matchCreate,
        ...match,
      } as any);

      const result = await matchService.create(matchCreate as any);
      expect(matchRepository.create).toHaveBeenCalledWith({
        ...matchCreate,
      });
      expect(result).toEqual({
        ...matchCreate,
        ...match,
      });
    });

    it('Should return the error "BadRequestException"', async () => {
      jest.spyOn(matchRepository, 'create').mockRejectedValue(new Error());
      await expect(matchService.create({} as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('Should return array of match', async () => {
      const arraymatch = [createMatch()];
      jest
        .spyOn(matchRepository, 'findAll')
        .mockResolvedValue(arraymatch as any);

      const result = await matchService.findAll();

      expect(matchRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(arraymatch);
    });
  });

  describe('findOne', () => {
    it('Should return one match', async () => {
      const id = 'idOfmatch123';
      const match = createMatch();

      jest.spyOn(matchRepository, 'findOneId').mockResolvedValue(match as any);

      const result = await matchService.findOne(id);

      expect(matchRepository.findOneId).toHaveBeenCalledWith(id);
      expect(result).toEqual(match);
    });

    it('Should return the error "match not found"', async () => {
      jest.spyOn(matchRepository, 'findOneId').mockResolvedValue(null);
      await expect(matchService.findOne('1a2b3c')).rejects.toThrow(
        'Match not found',
      );
    });

    it('Should return the error "Type of id invalid"', async () => {
      const errorImplementKey = new BadRequestException();
      errorImplementKey['path'] = '_id';

      jest.spyOn(matchRepository, 'findOneId').mockImplementationOnce(() => {
        throw errorImplementKey;
      });
      await expect(matchService.findOne('1a2b3c')).rejects.toThrow(
        'Type of id invalid',
      );
    });

    it('Should return the error "BadRequestException"', async () => {
      jest.spyOn(matchRepository, 'findOneId').mockRejectedValue(new Error());
      await expect(matchService.findOne('1a2b3c')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('Should return match updated', async () => {
      const match = createMatch();
      const matchUpdated = {
        result: [
          {
            set: 'player wins',
          },
        ],
        def: 'IdPlayer',
      };
      const id = '3672ihr23t6723y26';

      jest.spyOn(matchRepository, 'update').mockResolvedValue({
        ...match,
        ...matchUpdated,
      } as any);

      const result = await matchService.update(id, matchUpdated as any);

      expect(matchRepository.update).toHaveBeenCalledWith(id, matchUpdated);
      expect(result).toEqual({
        ...match,
        ...matchUpdated,
      });
    });

    it('Should return the error "match not found"', async () => {
      jest.spyOn(matchRepository, 'update').mockResolvedValue(null);
      await expect(matchService.update('', {} as any)).rejects.toThrow(
        'Match not found',
      );
    });

    it('Should return the error "Type of id invalid"', async () => {
      const errorImplementKey = new BadRequestException();
      errorImplementKey['path'] = '_id';

      jest.spyOn(matchRepository, 'update').mockImplementationOnce(() => {
        throw errorImplementKey;
      });
      await expect(matchService.update('', {} as any)).rejects.toThrow(
        'Type of id invalid',
      );
    });

    it('Should return the error "BadRequestException"', async () => {
      jest.spyOn(matchRepository, 'update').mockRejectedValue(new Error());
      await expect(matchService.update('', {} as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('delete', () => {
    it('Should return match deleted', async () => {
      const match = createMatch();
      const id = '3672ihr23t6723y26';

      jest.spyOn(matchRepository, 'delete').mockReturnValue(match as any);

      const result = await matchService.delete(id);

      expect(matchRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(match);
    });

    it('Should return the error "match not found"', async () => {
      jest.spyOn(matchRepository, 'delete').mockResolvedValue(null);
      await expect(matchService.delete('idTeste123')).rejects.toThrow(
        'Match not found',
      );
    });

    it('Should return the error "Type of id invalid"', async () => {
      const errorImplementKey = new BadRequestException();
      errorImplementKey['path'] = '_id';

      jest.spyOn(matchRepository, 'delete').mockImplementationOnce(() => {
        throw errorImplementKey;
      });
      await expect(matchService.delete('')).rejects.toThrow(
        'Type of id invalid',
      );
    });

    it('Should return the error "BadRequestException"', async () => {
      jest.spyOn(matchRepository, 'delete').mockRejectedValue(new Error());
      await expect(matchService.delete('')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
