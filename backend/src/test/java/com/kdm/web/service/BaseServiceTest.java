package com.kdm.web.service;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import com.kdm.web.service.config.SimpleContextConfiguration;

@SpringBootTest(classes = {SimpleContextConfiguration.class})
@RunWith(SpringRunner.class)
@ExtendWith(SpringExtension.class)
@ActiveProfiles("no_kdm_security")
abstract public class BaseServiceTest {

}
