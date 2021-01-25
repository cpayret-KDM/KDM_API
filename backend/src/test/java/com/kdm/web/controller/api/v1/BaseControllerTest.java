package com.kdm.web.controller.api.v1;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import com.kdm.web.controller.api.v1.config.SimpleContextConfiguration;


@RunWith(SpringRunner.class)
@ExtendWith(SpringExtension.class)
@ActiveProfiles("no_kdm_security")
@Import({SimpleContextConfiguration.class})
abstract public class BaseControllerTest {

}
