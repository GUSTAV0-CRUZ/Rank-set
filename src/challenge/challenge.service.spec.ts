/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeService } from './challenge.service';
import { ChallengeRepository } from './repository/challenge.repository';
import { PlayerService } from 'src/player/player.service';
import { CategoryService } from 'src/category/category.service';
import { createChallenge } from 'src/utils/challenge/create-challenge';
import { createPlayer } from 'src/utils/player/create-player';
import { createCategory } from 'src/utils/category/create-category';
import { BadRequestException } from '@nestjs/common';

describe('ChallengeService', () => {
  let challengeService: ChallengeService;
  let challengeRepository: ChallengeRepository;
  let playerService: PlayerService;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeService,
        {
          provide: ChallengeRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: PlayerService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            findCategoryContainPlayerId: jest.fn(),
          },
        },
      ],
    }).compile();

    challengeService = module.get<ChallengeService>(ChallengeService);
    challengeRepository = module.get<ChallengeRepository>(ChallengeRepository);
    playerService = module.get<PlayerService>(PlayerService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(challengeService).toBeDefined();
  });

  describe('create', () => {
    it('Should return new Challenge', async () => {
      const challenge = createChallenge();
      const player = createPlayer();
      const category = createCategory();

      const challengeCreate = {
        players: ['IdPlayer1', 'IdPlayer2'],
        applicant: 'IdPlayer1',
        dateHourChallenge: '2026-02-03T10:05:02',
      };

      jest.spyOn(playerService, 'findOne').mockResolvedValue(player as any);

      jest
        .spyOn(categoryService, 'findCategoryContainPlayerId')
        .mockResolvedValue(category as any);

      jest.spyOn(challengeRepository, 'create').mockResolvedValue({
        ...challenge,
        ...challengeCreate,
      } as any);

      const result = await challengeService.create(challengeCreate as any);

      expect(playerService.findOne).toHaveBeenCalledWith(
        challengeCreate.players[0],
      );
      expect(playerService.findOne).toHaveBeenCalledWith(
        challengeCreate.players[1],
      );
      expect(categoryService.findCategoryContainPlayerId).toHaveBeenCalledWith(
        challengeCreate.applicant,
      );
      expect(challengeRepository.create).toHaveBeenCalledWith({
        ...challengeCreate,
        dateHourRequest: challenge.dateHourRequest,
        status: challenge.status,
        category: category.name,
      });
      expect(result).toEqual({
        ...challenge,
        ...challengeCreate,
      });
    });

    it('Should return the error "Applicant not is one player of challenge"', async () => {
      const challengeCreate = {
        players: ['IdPlayer1', 'IdPlayer2'],
        applicant: 'IdPlayer3',
        dateHourChallenge: '2026-02-03T10:05:02',
      };
      await expect(
        challengeService.create(challengeCreate as any),
      ).rejects.toThrow('Applicant not is one player of challenge');
    });

    it('Should return the error "BadRequestException"', async () => {
      jest.spyOn(challengeRepository, 'create').mockRejectedValue(new Error());
      await expect(challengeService.create({} as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
